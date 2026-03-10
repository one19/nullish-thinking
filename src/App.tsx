import { MDXProvider } from '@mdx-js/react';
import Storytime from './slides/storytime.mdx';
import CoreMessage from './slides/core-message.mdx';
import ImaginationScale from './slides/imagination-scale.mdx';
import ImaginationScale2 from './slides/imagination-scale-2.mdx';
import Yes from './slides/yes.mdx';
import LessYes from './slides/less-yes.mdx';
import YesSortOf from './slides/yes-sortof.mdx';
import DotsTwoLines from './slides/dots-two-lines.mdx';
import DotsCircle from './slides/dots-circle.mdx';
import Dots4x5 from './slides/dots-4x5.mdx';
import Dots5x4 from './slides/dots-5x4.mdx';
import DotsTwoSquares from './slides/dots-two-squares.mdx';
import DotsCornerYadda from './slides/dots-corner-yadda.mdx';
import DotsStar from './slides/dots-star.mdx';
import OptionChains from './slides/option-chains.mdx';
import Maybes from './slides/maybes.mdx';
import Hand from './slides/hand.mdx';
import IncitingIncident from './slides/inciting-incident.mdx';
import RealIncident from './slides/inciting-incident-2.mdx';
import CognitiveDebt from './slides/debt.mdx';
import { Deck } from './Deck';
import { mdxComponents } from './MDXComponents';

const App = () => (
  <MDXProvider components={mdxComponents}>
    <Deck
      slides={[
        <Storytime key="1" />,
        <CoreMessage key="2" />,
        <ImaginationScale key="3" />,
        <ImaginationScale2 key="4" />,
        <DotsStar key="5" />,
        <Hand key="6" />,
        <Yes key="7" />,
        <YesSortOf key="8" />,
        <Yes key="9" />,
        <LessYes key="10" />,
        <DotsTwoLines key="11" />,
        <DotsCircle key="12" />,
        <Dots4x5 key="13" />,
        <DotsCornerYadda key="14" />,
        <Dots5x4 key="15" />,
        <DotsTwoSquares key="16" />,
        <CoreMessage key="17" />,
        <OptionChains key="18" />,
        <Maybes key="19" />,
        <IncitingIncident key="20" />,
        <RealIncident key="21" />,
        <CognitiveDebt key="22" />,
        <CoreMessage key="23" />,
      ]}
    />
  </MDXProvider>
);

export default App;
