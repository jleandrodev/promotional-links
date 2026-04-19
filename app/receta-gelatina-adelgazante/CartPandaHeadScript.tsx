'use client';

import { useEffect } from 'react';

const SCRIPT_ID = 'cpsales-mycartpanda';
const SCRIPT_SRC =
  'https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/cpsales.js';

/** Injeta o script de vendas no head apenas nesta rota. */
export function CartPandaHeadScript() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const el = document.createElement('script');
    el.id = SCRIPT_ID;
    el.type = 'text/javascript';
    el.src = SCRIPT_SRC;
    document.head.appendChild(el);
  }, []);

  return null;
}
