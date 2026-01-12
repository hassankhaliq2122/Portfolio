import React from 'react'
import { StaggeredMenu } from './ui/Menu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Work', ariaLabel: 'Learn about us', link: '/work' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'About', ariaLabel: 'Get in touch', link: '/about' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const MenuComponent = () => {
  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      accentColor="#040cdc"
      position="left"
      isFixed={true}
      menuButtonColor="#000"
      openMenuButtonColor="#fff"
    />
  );
};

export default MenuComponent;