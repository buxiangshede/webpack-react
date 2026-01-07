export const About = () => (
  <section className="glass-panel space-y-4 p-6 text-sm text-muted">
    <p className="text-xs uppercase tracking-[0.3em]">About</p>
    <h2 className="text-2xl font-semibold text-white">Handler SPA</h2>
    <p>
      这是一个基于 React + TypeScript + Webpack 的 DApp 演示。前端直接调用智能合约，后端通过 REST
      返回课程与个人数据，便于快速迭代 PC 端体验。
    </p>
    <p>界面强调科技感与可读性，所有页面在一个布局中独立实现，方便二次开发。</p>
  </section>
);

export default About;
