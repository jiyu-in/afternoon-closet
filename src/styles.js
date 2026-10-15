import styled, { createGlobalStyle } from "styled-components";
export const Global = createGlobalStyle`
*{box-sizing:border-box}html,body,#root{width:100%;height:100%;margin:0;overflow:hidden}body{font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;background:#302a27;color:#53483f}button,input,textarea,select{font:inherit}button{cursor:pointer;color:inherit;-webkit-tap-highlight-color:transparent}button:disabled{cursor:default;opacity:.5}button,input,textarea{outline-offset:4px}button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #ad765f}button{touch-action:manipulation}h1,h2,h3,p{margin:0}button{transition:background .18s,border-color .18s,box-shadow .18s}::selection{background:#dfc2b4}*{scrollbar-width:thin;scrollbar-color:#c6b6a5 transparent}svg{display:block}button svg{flex-shrink:0}button[aria-pressed=true]{border-color:#9a715e}a{color:inherit}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;
export const Game = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  height: 100dvh;
  isolation: isolate;
  overflow: hidden;
  background: #594335;
`;
export const Scene = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  .interactable {
    cursor: pointer;
    transition: filter 0.25s;
  }
  .interactable:hover,
  .interactable:focus-visible {
    filter: drop-shadow(0 0 8px #f2d9a7);
    outline: none;
  }
  .scene-avatar {
    filter: drop-shadow(3px 6px 3px #30251b33);
  }
  @media (max-width: 650px) {
    .wardrobe-object {
      transform: translate(-180px, 20px) scale(0.8);
      transform-origin: 1097px 768px;
    }
    .plant-position {
      transform: translate(180px, 0);
    }
  }
  .room-wall {
    mix-blend-mode: color;
  }
  .room-light {
    pointer-events: none;
    animation: light 12s ease-in-out infinite alternate;
  }
  .dust {
    animation: dust 18s ease-in-out infinite alternate;
    pointer-events: none;
  }
  .plant {
    transform-origin: 420px 850px;
    animation: sway 9s ease-in-out infinite alternate;
  }
  @keyframes light {
    from {
      opacity: 0.09;
    }
    to {
      opacity: 0.18;
    }
  }
  @keyframes dust {
    from {
      transform: translate(0, 0);
      opacity: 0.2;
    }
    to {
      transform: translate(12px, -28px);
      opacity: 0.65;
    }
  }
  @keyframes sway {
    from {
      transform: rotate(-0.4deg);
    }
    to {
      transform: rotate(0.4deg);
    }
  }
  [data-motion="false"] & * {
    animation: none !important;
  }
`;
export const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(#211b2233, transparent 18%, transparent 75%, #261d1b55),
    radial-gradient(ellipse at center, transparent 55%, #35201930);
`;
export const Corner = styled.div`
  position: absolute;
  z-index: 2;
  top: max(22px, env(safe-area-inset-top));
  ${(p) => (p.$right ? "right" : "left")}:28px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff5df;
  text-shadow: 0 2px 8px #31231a77;
  font-size: 11px;
  letter-spacing: 1px;
  .brand {
    font-family: Georgia, "Batang", serif;
    font-size: 19px;
    letter-spacing: 2px;
    font-weight: 400;
  }
  .date {
    border-left: 1px solid #f4dec066;
    padding-left: 13px;
    line-height: 1.9;
  }
  .weather {
    display: flex;
    gap: 7px;
    align-items: center;
  }
  @media (max-width: 600px) {
    top: max(15px, env(safe-area-inset-top));
    ${(p) => (p.$right ? "right" : "left")}:16px;
    gap: 9px;
    .brand {
      font-size: 15px;
    }
    .date {
      display: none;
    }
    .weather span {
      display: none;
    }
  }
`;
export const RoundButton = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 37px;
  height: 37px;
  border: 1px solid #f1e4ce70;
  border-radius: 50%;
  background: #f8f0e3dd;
  color: #725e4d;
  box-shadow: 0 2px 10px #291a1720;
  &:hover {
    background: #fff9ec;
  }
  span {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #aa6457;
    margin: -25px -25px 0 0;
  }
`;
export const Dock = styled.nav`
  position: absolute;
  z-index: 5;
  bottom: max(22px, env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  padding: 8px 12px;
  border: 1px solid #f4e8d2b0;
  box-shadow:
    0 8px 40px #2c211c30,
    inset 0 1px #fff9ec;
  border-radius: 20px;
  background: #f5eee1ef;
  backdrop-filter: blur(16px);
  @media (max-width: 600px) {
    bottom: max(12px, env(safe-area-inset-bottom));
    gap: 0;
    padding: 6px 5px;
    border-radius: 16px;
    width: calc(100% - 28px);
    justify-content: space-around;
  }
`;
export const DockButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 78px;
  padding: 7px 12px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: ${(p) => (p.$active ? "#e5d6c6" : "transparent")};
  color: ${(p) => (p.$active ? "#8b5c49" : "#7c6b58")};
  font-size: 10px;
  letter-spacing: 1px;
  &:hover {
    background: #e8ddce;
  }
  small {
    position: absolute;
    top: 6px;
    right: 16px;
    width: 5px;
    height: 5px;
    background: #b37969;
    border-radius: 50%;
  }
  @media (max-width: 600px) {
    min-width: 0;
    flex: 1;
    padding: 7px 5px;
    font-size: 9px;
    letter-spacing: 0;
    gap: 5px;
    svg {
      width: 21px;
      height: 21px;
    }
  }
`;
export const SceneCaption = styled.div`
  position: absolute;
  bottom: 128px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  color: #fff3dd;
  text-shadow: 0 2px 6px #291b16;
  font-family: Georgia, "Batang", serif;
  font-size: 13px;
  letter-spacing: 3px;
  white-space: nowrap;
  @media (max-width: 600px) {
    bottom: 105px;
    font-size: 11px;
  }
`;
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  background: ${(p) => (p.$fitting ? "linear-gradient(90deg,#ede3d5fa 0%,#ede3d5f0 45%,#42382d80 100%)" : "#30251e50")};
  backdrop-filter: blur(${(p) => (p.$fitting ? "9" : "4")}px);
  @media (max-width: 650px) {
    background: ${(p) => (p.$fitting ? "#ede3d5f5" : "#30251e70")};
  }
`;
export const Fitting = styled.div`
  position: absolute;
  inset: 60px 450px 115px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .avatar {
    height: 100%;
    max-width: 100%;
    aspect-ratio: 2/3;
    filter: drop-shadow(8px 12px 8px #6c4d3722);
    position: relative;
    z-index: 1;
  }
  .fitting-oval {
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 85%;
    max-width: 540px;
    border-radius: 50% 50% 45% 45%;
    border: 1px solid #b4a28a66;
    background: radial-gradient(ellipse, #f9f5e9 15%, #dccdb978 75%);
    box-shadow:
      0 0 0 12px #e2d6c13a,
      inset 0 0 55px #baa28a20;
  }
  .avatar.is-zoomed {
    transform: scale(1.5);
    transform-origin: 50% 25%;
  }
  .zoom-control {
    position: absolute;
    right: 15px;
    top: 12px;
    z-index: 3;
    border: 1px solid #bba78c;
    border-radius: 20px;
    padding: 8px 12px;
    background: #f6eddddf;
    color: #8d7155;
    font-size: 10px;
  }
  .fitting-title {
    position: absolute;
    top: 12px;
    left: 15px;
    z-index: 2;
    color: #a18a71;
    font-family: Georgia, serif;
    font-size: 11px;
    letter-spacing: 4px;
    writing-mode: vertical-rl;
  }
  .fitting-floor {
    position: absolute;
    bottom: 0;
    width: 50%;
    height: 4%;
    background: radial-gradient(ellipse, #765d3c45, transparent 70%);
  }
  @media (max-width: 1000px) {
    right: 370px;
    left: 0;
  }
  .fitting-label {
    position: absolute;
    bottom: 0;
    right: 10px;
    z-index: 2;
    color: #8c7964;
    font-size: 10px;
    letter-spacing: 2px;
  }
  @media (max-width: 650px) {
    inset: 53px 0 47% 0;
    .fitting-title {
      left: 24px;
      top: 15px;
      font-size: 9px;
    }
    .fitting-oval {
      width: 52%;
      height: 95%;
    }
    .fitting-label {
      right: 20px;
      font-size: 9px;
      bottom: 10px;
    }
  }
`;
export const Panel = styled.section`
  position: absolute;
  top: 76px;
  right: 30px;
  bottom: 119px;
  width: 390px;
  display: flex;
  flex-direction: column;
  background: #fbf6ebfa;
  border: 1px solid #f7eddb;
  border-radius: 15px;
  box-shadow: 0 12px 50px #31251e30;
  overflow: hidden;
  ${(p) => (p.$wide ? "width:min(740px,calc(100% - 80px));left:50%;right:auto;transform:translateX(-50%);" : "")}@media(max-width:1000px) {
    ${(p) => (!p.$wide ? "right:20px;width:330px;" : "")}
  }
  @media (max-width: 650px) {
    ${(p) => (p.$fitting ? "top:54%;" : "top:68px;")}bottom:106px;
    left: 12px;
    right: 12px;
    width: auto;
    transform: none;
    border-radius: 15px;
  }
`;
export const PanelHead = styled.header`
  padding: 22px 23px 18px;
  border-bottom: 1px solid #e0d5c3;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  h1,
  h2 {
    font-family: Georgia, "Batang", serif;
    font-size: 21px;
    letter-spacing: 1px;
    font-weight: 500;
  }
  p {
    font-size: 10px;
    color: #9c8975;
    margin-top: 5px;
    letter-spacing: 1px;
  }
  .close {
    margin-left: auto;
    background: none;
    border: 0;
    padding: 7px;
    color: #927c67;
    border-radius: 50%;
  }
  .close:hover {
    background: #e9dece;
  }
  @media (max-width: 650px) {
    padding: 13px 18px 12px;
    h1,
    h2 {
      font-size: 18px;
    }
    p {
      font-size: 9px;
    }
  }
`;
export const PanelBody = styled.div`
  padding: 20px 23px;
  overflow: auto;
  min-height: 0;
  flex: 1;
  overscroll-behavior: contain;
  @media (max-width: 650px) {
    padding: 14px 17px;
  }
`;
export const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 18px;
  button {
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    padding: 8px 10px;
    font-size: 11px;
    white-space: nowrap;
    color: #9c8871;
  }
  button[aria-selected="true"],
  button[aria-pressed="true"] {
    background: #e7d9c5;
    color: #75563e;
    border-color: #d0baa0;
  }
  button:hover {
    background: #efe5d5;
  }
  @media (max-width: 650px) {
    gap: 2px;
    margin-bottom: 12px;
    button {
      padding: 7px 9px;
      font-size: 10px;
    }
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$columns || 2}, minmax(0, 1fr));
  gap: 10px;
`;
export const Item = styled.button`
  position: relative;
  background: ${(p) => (p.$active ? "#ede1cd" : "#f2eadd")};
  border: 1px solid ${(p) => (p.$active ? "#a98263" : "#e1d6c5")};
  border-radius: 8px;
  padding: 0 0 12px;
  text-align: left;
  min-width: 0;
  overflow: hidden;
  span.item-name {
    display: block;
    font-size: 11px;
    line-height: 1.5;
    padding: 0 10px;
    color: #705a46;
  }
  small {
    display: block;
    font-size: 9px;
    padding: 4px 10px 0;
    color: #a18d78;
  }
  span.tick {
    position: absolute;
    top: 7px;
    right: 7px;
    background: #967454;
    color: #fff7e9;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
  .preview {
    height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    background: radial-gradient(ellipse, #fffaf0aa, transparent 80%);
  }
  &:hover {
    border-color: #b49373;
    background: #e9ddc9;
  }
  @media (max-width: 650px) {
    .preview {
      height: 106px;
    }
    span.item-name {
      font-size: 10px;
    }
    small {
      font-size: 8px;
    }
  }
`;
export const Action = styled.button`
  border: 1px solid ${(p) => (p.$primary ? "#83654f" : "#cfbea7")};
  border-radius: 7px;
  background: ${(p) => (p.$primary ? "#83654f" : "#faf4e7")};
  color: ${(p) => (p.$primary ? "#fff4df" : "#7e654e")};
  padding: 10px 14px;
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  line-height: 1.5;
  white-space: nowrap;
  &:hover {
    background: ${(p) => (p.$primary ? "#6b4e3a" : "#e8dac5")};
  }
`;
export const Field = styled.input`
  min-width: 0;
  width: 100%;
  background: #fffaf1;
  border: 1px solid #d9cbb5;
  border-radius: 6px;
  padding: 11px 12px;
  color: #705a46;
  font-size: 12px;
  ::placeholder {
    color: #b09c84;
  }
`;
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 165px;
  resize: vertical;
  border: 1px solid #d9cbb5;
  border-radius: 6px;
  padding: 13px;
  background: repeating-linear-gradient(#fffaf1, #fffaf1 31px, #e5d8c5 32px);
  line-height: 32px;
  color: #705a46;
  margin: 12px 0;
  font-size: 12px;
`;
export const PanelFoot = styled.div`
  flex-shrink: 0;
  border-top: 1px solid #ddd0ba;
  padding: 15px 22px;
  background: #f4ebdc;
  .save-row {
    display: flex;
    gap: 7px;
  }
  .subtle {
    font-size: 9px;
    color: #a18b72;
    margin-top: 8px;
    text-align: center;
  }
  @media (max-width: 650px) {
    padding: 10px 16px;
    .subtle {
      display: none;
    }
    input {
      padding: 9px;
      font-size: 11px;
    }
    button {
      padding: 9px;
      font-size: 10px;
    }
  }
`;
export const Toast = styled.div`
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 125px;
  transform: translateX(-50%);
  padding: 12px 20px;
  border: 1px solid #f3e7cf70;
  background: #65503bef;
  box-shadow: 0 4px 20px #1f171320;
  backdrop-filter: blur(8px);
  color: #fff4df;
  font-size: 12px;
  border-radius: 30px;
  text-align: center;
  max-width: calc(100% - 30px);
  width: max-content;
  pointer-events: none;
  @media (max-width: 650px) {
    bottom: 108px;
    font-size: 11px;
    padding: 10px 15px;
  }
`;
export const Quiet = styled.p`
  font-size: 11px;
  line-height: 1.9;
  color: #9c866f;
`;
export const SectionLabel = styled.h3`
  font-size: 11px;
  letter-spacing: 2px;
  color: #8c7157;
  font-weight: 500;
  margin: 8px 0 15px;
`;
export const Auxiliary = createGlobalStyle`.diary-avatar{height:140px;width:70px;flex-shrink:0}.avatar{animation:arrival .35s ease-out}@keyframes arrival{from{opacity:.6}to{opacity:1}}`;
export const PreviewFix = createGlobalStyle`.preview>svg{width:100%;height:100%}`;
export const CompactLandscape = createGlobalStyle`
@media (max-height:500px) and (min-width:651px) {
 [aria-label="게임 도구 모음"] {bottom:8px;padding:5px 10px;border-radius:14px}
 [aria-label="게임 도구 모음"] button {padding:4px 10px;gap:3px}
 [role="region"] {top:49px;bottom:85px}
 [role="region"] header {padding:9px 16px}
 [role="region"] header h1 {font-size:17px}
 [role="region"] header p {font-size:8px}
 [role="region"] form.save-row+* {display:none}
}
`;
