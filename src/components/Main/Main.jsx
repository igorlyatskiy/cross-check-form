import React from "react";

import ContentWrapper from "./ContentWrapper/ContentWrapper";
import Prepare from "./Prepare/Prepare";

export default function Main() {
  return <main>
    <Prepare/>
    <ContentWrapper/>
  </main>;
}
