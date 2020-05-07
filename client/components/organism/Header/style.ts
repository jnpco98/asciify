import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import Text, { TextType } from '@components/atom/Text';
import { center, FLEX_ALIGN_MAIN } from '@utilities/mixins';
import { logo } from '@icons';
import * as M from '@utilities/media';

const DynamicIcon = dynamic(() => import('@components/molecule/DynamicIcon'), { ssr: false });

type HeaderMenuProps = {
  floating: boolean;
};

type HeaderMenuItemProps = {
  active: boolean;
  icon?: boolean;
};

export const LeftMenu = styled.ul`
  margin-left: 1rem;

  ${M.MEDIA_XSMALL} {
    margin-left: 2rem;
  }
`;

export const RightMenu = styled.ul`
  margin-right: 1rem;

  ${M.MEDIA_XSMALL} {
    margin-right: 2rem;
  }
`;

export const Link = styled(Text).attrs({ textType: TextType.Anchor })<{ link: string }>`
  overflow: hidden;

  &:after {
    transition: all 0.3s ease;
  }
`;

export const Button = styled(Text).attrs({ textType: TextType.Span })`
  overflow: hidden;

  &:after {
    transition: all 0.3s ease;
  }
`;

export const MenuItem = styled.li<HeaderMenuItemProps>`
  ${center(FLEX_ALIGN_MAIN)};

  cursor: pointer;
  text-transform: uppercase;
  margin: 0 0.9rem;

  ${Link} {
    position: relative;

    &:after {
      content: '';
      width: 100%;
      height: 2px;
      position: absolute;
      background: black;
      bottom: 0;
      left: 0;
      transform: translateX(-110%);
    }
  }

  &:hover {
    ${Link}:after {
      transform: translateX(0);
    }
  }

  ${(props) =>
    props.icon &&
    css`
      padding-top: 0;
      margin-right: 0;

      ${Link}, ${Button} {
        width: 1rem;
        height: 1rem;
        font-size: unset;

        &:after {
          content: none;
        }
      }
    `};

  ${(props) =>
    props.active &&
    css`
      ${Link}:after {
        transform: translateX(0);
      }
    `};

  ${M.MEDIA_XXSMALL} {
    margin: 0 0.5rem;
  }

  ${M.MEDIA_XSMALL} {
    margin: 0 1rem;

    ${(props) =>
      props.icon &&
      css`
        padding-top: 0;
        ${Link}, ${Button} {
          width: 1.2rem;
          height: 1.2rem;
        }
      `}
  }
`;

export const DrawerTrigger = styled.li`
  margin: 0 1rem;
`;

export const Container = styled.header<HeaderMenuProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  position: fixed;
  transition: all 0.2s ease;
  z-index: 50;
  background: transparent;
  color: ${({ theme }) => theme.colors.backgroundSecondary};

  ${LeftMenu}, ${RightMenu} {
    display: flex;
  }

  ${(props) =>
    props.floating &&
    css`
      font-size: 0.9rem;
      position: fixed;
      box-shadow: 0px 10px 13px -9px rgba(0, 0, 0, 0.75);
      background: rgba(255, 255, 255, 0.3);
    `};
`;

export const Logo = styled(DynamicIcon).attrs({ SVGString: logo })`
  width: 6rem;
  path {
    fill: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;