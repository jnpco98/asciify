import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { blob } from '@icons';
import * as M from '@utilities/media';

const DynamicIcon = dynamic(() => import(`@components/molecule/DynamicIcon`), { ssr: false });

export const BlobIcon = styled(DynamicIcon).attrs({ SVGString: blob })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  ${M.MEDIA_SMALL} {
    width: 70%;
  }
`;