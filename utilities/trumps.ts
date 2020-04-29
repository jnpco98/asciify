import { css, createGlobalStyle } from 'styled-components';
import * as M from '@utilities/media';

const swiper = css`
  .swiper-container {
    .swiper-controls {
      color: ${({ theme }) => theme.colors.primary};
    }

    .swiper-pagination-progressbar {
      top: 2rem;
    }

    .swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    .swiper-button-next,
    .swiper-button-prev {
      display: none;
      height: 3rem;
      transition: 0.3s ease;
      top: 50%;
    }

    .swiper-button-next {
      padding: 1rem 1rem 1rem 0;
      transform: translate(-50%, -50%);
      &:hover {
        transform: translate(-20%, -50%);
      }
    }

    .swiper-button-prev {
      padding: 1rem 0 1rem 1rem;
      transform: translate(50%, -50%);
      &:hover {
        transform: translate(20%, -50%);
      }
    }

    ${M.MEDIA_SMALL} {
      .swiper-button-next,
      .swiper-button-prev {
        display: block;
      }

      .swiper-pagination {
        display: none;
      }
    }

    ${M.MEDIA_MEDIUM} {
      .swiper-button-next {
        transform: translate(-100%, -50%);
        &:hover {
          transform: translate(-60%, -50%);
        }
      }

      .swiper-button-prev {
        transform: translate(100%, -50%);
        &:hover {
          transform: translate(60%, -50%);
        }
      }
    }

    ${M.MEDIA_LARGE} {
      .swiper-button-next {
        transform: translate(-120%, -50%);
        &:hover {
          transform: translate(-80%, -50%);
        }
      }

      .swiper-button-prev {
        transform: translate(120%, -50%);
        &:hover {
          transform: translate(80%, -50%);
        }
      }
    }
  }
`;

export default createGlobalStyle`
  ${swiper}
`;