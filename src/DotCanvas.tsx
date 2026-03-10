import { useState } from 'react';
import styled from '@emotion/styled';

type DotPosition = { x: number; y: number };

const Canvas = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto 0;
`;

const DotsArea = styled.div<{ width: number; height: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const Dot = styled.div<{ x: number; y: number; size: number }>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: left 0.4s ease;
`;

const Label = styled.div<{
  x: number;
  y: number;
  width: number;
  height: number;
}>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.6;
`;

const GAP = 52;
const DOT_SIZE = 20;

function computePositions(layout: string): DotPosition[] {
  switch (layout) {
    case 'two-lines':
      // 20 dots: 2 rows of 10
      return Array.from({ length: 2 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => ({
          x: col * GAP,
          y: row * GAP,
        })),
      ).flat();

    case 'circle': {
      // 21 dots in a circle
      const radius = 180;
      return Array.from({ length: 21 }, (_, i) => {
        const angle = (i / 21) * Math.PI * 2 - Math.PI / 2;
        return {
          x: radius + radius * Math.cos(angle),
          y: radius + radius * Math.sin(angle),
        };
      });
    }

    case '4x5':
      // 20 dots: 4 rows, 5 columns
      return Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => ({
          x: col * GAP,
          y: row * GAP,
        })),
      ).flat();

    case '5x4':
      // 20 dots: 5 rows, 4 columns
      return Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => ({
          x: col * GAP,
          y: row * GAP,
        })),
      ).flat();

    case 'corner-yadda':
      // L-shaped corner: top row (5) + left column below (3) = 8 dots
      return [
        ...Array.from({ length: 5 }, (_, col) => ({
          x: col * GAP,
          y: 0,
        })),
        ...Array.from({ length: 3 }, (_, i) => ({
          x: 0,
          y: (i + 1) * GAP,
        })),
      ];

    case 'two-squares': {
      // 2 x 3x3 squares (18 dots) + 2 leftover dots
      const squareGap = GAP * 4;
      const square = (offsetX: number) =>
        Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => ({
            x: col * GAP + offsetX,
            y: row * GAP,
          })),
        ).flat();
      const centerX = (squareGap + 2 * GAP) / 2;
      return [
        ...square(0),
        ...square(squareGap),
        { x: centerX - GAP / 2, y: 3.5 * GAP },
        { x: centerX + GAP / 2, y: 3.5 * GAP },
      ];
    }

    case 'star': {
      // 5 dots in a pentagon
      const radius = 140;
      return Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return {
          x: radius + radius * Math.cos(angle),
          y: radius + radius * Math.sin(angle),
        };
      });
    }

    default:
      return [];
  }
}

function getBounds(positions: DotPosition[]) {
  const xs = positions.map((p) => p.x);
  const ys = positions.map((p) => p.y);
  return {
    width: Math.max(...xs) + DOT_SIZE,
    height: Math.max(...ys) + DOT_SIZE,
  };
}

type LayoutLabel = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function getLabel(layout: string): LayoutLabel | null {
  if (layout === 'corner-yadda') {
    return {
      text: 'yadda-yadda',
      x: GAP,
      y: GAP,
      width: 4 * GAP,
      height: 3 * GAP,
    };
  }
  return null;
}

type DotCanvasProps = {
  layout:
    | 'two-lines'
    | 'circle'
    | '4x5'
    | '5x4'
    | 'two-squares'
    | 'corner-yadda'
    | 'star';
};

const SPLIT_GAP = 30;

const isClickable = (layout: string) =>
  layout === 'star' || layout === 'two-lines';

const StarLines = styled.svg<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

const DotCanvas = ({ layout }: DotCanvasProps) => {
  const [toggled, setToggled] = useState(false);
  const positions = computePositions(layout);
  const label = getLabel(layout);
  const { width, height } = getBounds(positions);

  // Apply split offset for two-lines: left 5 shift left, right 5 shift right
  const displayPositions =
    layout === 'two-lines' && toggled
      ? positions.map((pos, i) => ({
          ...pos,
          x: pos.x + (i % 10 < 5 ? -SPLIT_GAP : SPLIT_GAP),
        }))
      : positions;

  const displayWidth =
    layout === 'two-lines' && toggled ? width + SPLIT_GAP * 2 : width;

  // Pentagram order: connect every other vertex (0→2→4→1→3→0)
  const starOrder = [0, 2, 4, 1, 3];
  const halfDot = DOT_SIZE / 2;

  return (
    <Canvas>
      <DotsArea
        width={displayWidth}
        height={height}
        onClick={isClickable(layout) ? () => setToggled((v) => !v) : undefined}
        style={isClickable(layout) ? { cursor: 'pointer' } : undefined}
      >
        {displayPositions.map((pos, i) => (
          <Dot key={i} x={pos.x} y={pos.y} size={DOT_SIZE} />
        ))}
        {label && (
          <Label
            x={label.x}
            y={label.y}
            width={label.width}
            height={label.height}
          >
            {label.text}
          </Label>
        )}
        {layout === 'star' && (
          <StarLines visible={toggled} viewBox={`0 0 ${width} ${height}`}>
            <polygon
              points={starOrder
                .map(
                  (idx) =>
                    `${positions[idx].x + halfDot},${positions[idx].y + halfDot}`,
                )
                .join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </StarLines>
        )}
      </DotsArea>
    </Canvas>
  );
};

export default DotCanvas;
