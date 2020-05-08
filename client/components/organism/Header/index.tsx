import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ENABLE_ACCOUNTS, SITE_TITLE } from '@constants/environment';
import { MenuItem, mainMenu } from '@constants/menu';
import * as S from './style';

const DynamicIcon = dynamic(() => import('@components/molecule/DynamicIcon'), { ssr: false });

type Props = {
  onSelect?: Function;
};

function Header(props: Props) {
  const { onSelect } = props;

  const [activeMenuItem, setActiveMenuItem] = useState(mainMenu[0].key);
  const [floating, setFloating] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => onSelect && onSelect(activeMenuItem), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    setFloating(window.pageYOffset >= 30);
  }

  function handleSelect(key: string) {
    setActiveMenuItem(key);
    if (onSelect) onSelect(key);
  }

  function renderLinks(menuItem: MenuItem, key: string) {
    if (menuItem.key === 'account' && !ENABLE_ACCOUNTS) return <></>;
    return (
      <S.MenuItem
        key={key}
        active={menuItem.key === activeMenuItem}
        icon={!!menuItem.icon}
        onClick={() => {
          handleSelect(menuItem.key);
        }}
      >
        {menuItem.link ? (
          <S.Link link={menuItem.link}>
            {menuItem.icon ? <DynamicIcon SVGString={menuItem.label} /> : menuItem.label}
          </S.Link>
        ) : (
          <S.Button>
            {menuItem.icon ? <DynamicIcon SVGString={menuItem.label} /> : menuItem.label}
          </S.Button>
        )}
      </S.MenuItem>
    );
  }

  return (
    <S.Container floating={floating} ref={containerRef}>
      <S.LeftMenu>
        <li>
          <Link href="/" passHref>
            <S.LogoWrapper aria-label={SITE_TITLE}>
              <S.LogoImage />
              <S.Logo />
            </S.LogoWrapper>
          </Link>
        </li>
      </S.LeftMenu>

      <S.RightMenu>{mainMenu.map((item) => renderLinks(item, `main_${item.key}`))}</S.RightMenu>
    </S.Container>
  );
}

export default Header;
