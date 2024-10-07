import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LogTime, People, Activities, Places } from "./pages";
import { ViewLog } from "./pages/view-log";
import { Nav } from "react-bootstrap";


function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Nav defaultActiveKey="/log-time" as="ul" className="NavBar bg-dark">
					<Nav.Item as="li" className="NavItem">
						<Nav.Link href="/log-time" className="text-light">
							<i className="bi bi-clock-history"></i> Time Log
						</Nav.Link>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<Nav.Link href="/people" className="text-light">
							<i className="bi bi-people"></i> People
						</Nav.Link>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<Nav.Link href="/activities" className="text-light">
							<i className="bi bi-list-task"></i> Activities
						</Nav.Link>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<Nav.Link href="/places" className="text-light">
							<i className="bi bi-geo-alt"></i> Places
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Routes>
					<Route
						path="/log-time"
						element={<ViewLog />}
					/>
					<Route path="/people" element={<People />} />
					<Route path="/activities" element={<Activities />} />
					<Route path="/places" element={<Places />} />
					<Route path="/counter" element={<Counter />} />
				</Routes>
			</header>
		</div>
	);
}

export default App;
