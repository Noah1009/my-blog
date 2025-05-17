// components/image-on.js
"use client";

import { useState, useEffect } from "react";

export default function ImageOn({ children }) {
  const [imageOn, setImageOn] = useState(false);

  useEffect(() => {
    setImageOn(true);
  }, []);

  return children(imageOn);
}
