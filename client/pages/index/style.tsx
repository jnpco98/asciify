import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { blob } from '@icons';

const DynamicIcon = dynamic(() => import(`@components/molecule/DynamicIcon`), { ssr: false });

export const BlobIcon = styled(DynamicIcon).attrs({ SVGString: blob })`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  z-index: -1;
`;