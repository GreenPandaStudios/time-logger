import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Route, Routes, NavLink } from "react-router-dom";
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
						<NavLink to="/log-time" className="text-light">
							<i className="bi bi-clock-history"></i> Time Log
						</NavLink>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<NavLink to="/people" className="text-light">
							<i className="bi bi-people"></i> People
						</NavLink>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<NavLink to="/activities" className="text-light">
							<i className="bi bi-list-task"></i> Activities
						</NavLink>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<NavLink to="/places" className="text-light">
							<i className="bi bi-geo-alt"></i> Places
						</NavLink>
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
