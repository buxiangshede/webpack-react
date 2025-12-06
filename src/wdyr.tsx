/// <Reference types="@welldone-software/why-did-you-render" />
import React from "react";

if (process.env.NODE_ENV === "development") {
	// 防止在非 dev 环境运行
	const whyDidYouRender = require("@welldone-software/why-did-you-render");
	whyDidYouRender(React, {
		onlyLogs: true,
		titleColor: "green",
		diffNameColor: "blackturquoise",
		trackHoos: true,
		trackAllPureComponents: true, // 自动追踪所有可优化组件
	});
}
