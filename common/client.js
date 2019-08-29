import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "@material-ui/styles"
import App from "./App"
import theme from "./theme"

function Main() {
	React.useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side")
		if (jssStyles) {
			jssStyles.parentNode.removeChild(jssStyles)
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	)
}

ReactDOM.hydrate(<Main />, document.querySelector("#root"))
