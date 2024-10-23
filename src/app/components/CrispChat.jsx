"use client"
import { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = 'a070232c-6970-4dd1-8bf9-3d72caeb25ea'; // Replace with your Crisp Website ID
    (function() {
      var d = document;
      var s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  }, []);

  return null; // No UI element is needed as Crisp chat is added globally
};

export default CrispChat;
