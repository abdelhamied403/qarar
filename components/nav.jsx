import React from 'react';
import Link from 'next/link';

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
];

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      {links.map(({ href, label }) => (
        <li key={href}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
