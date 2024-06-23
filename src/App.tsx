import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LogTime, People,Activities, Places } from "./pages";
import { ViewLog } from "./pages/view-log";
import { Nav } from "react-bootstrap";


function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Nav defaultActiveKey="/log-time" as="ul">
					<Nav.Item as="li">
						<Nav.Link href="/log-time">Time Log</Nav.Link>
					</Nav.Item>
          <Nav.Item as="li">
						<Nav.Link href="/people">People</Nav.Link>
					</Nav.Item>
          <Nav.Item as="li">
						<Nav.Link href="/activities">Activities</Nav.Link>
					</Nav.Item>
          <Nav.Item as="li">
						<Nav.Link href="/places">Places</Nav.Link>
					</Nav.Item>
          <Nav.Item as="li">
						<Nav.Link href="/counter">Counter</Nav.Link>
					</Nav.Item>
				</Nav>
				<Routes>
					<Route
						path="/log-time"
						element={
							<>
								<LogTime />
								<ViewLog />
							</>
						}
					/>
          <Route path="/people" element ={<People/>}/>
          <Route path="/activities" element ={<Activities/>}/>
					<Route path="/places" element={<Places />} />
          <Route path="/counter" element={<Counter />} />
				</Routes>
			</header>
		</div>
	);
}

export default App;
