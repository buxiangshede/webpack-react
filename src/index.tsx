/*
 * @Author: shasha0102 970284297@qq.com
 * @Date: 2025-12-02 20:09:29
 * @LastEditors: shasha0102 970284297@qq.com
 * @LastEditTime: 2025-12-04 22:19:18
 * @FilePath: /handler-spa/react-webpack/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const a:string = 'hello world'
// console.log(a, 'a')

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./pages/App";
import "./style.css";
import "./wdyr.tsx";

const container =
	typeof document !== "undefined" ? document.getElementById("root") : null;

if (container) {
	createRoot(container).render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
	);
}
