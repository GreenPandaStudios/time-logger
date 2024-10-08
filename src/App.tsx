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
				<Routes>
					<Route path="/time-logger" element={<ViewLog />}/>
					<Route
						path="/time-logger/log-time"
						element={<ViewLog />}
					/>
					<Route path="/time-logger/people" element={<People />} />
					<Route path="/time-logger/activities" element={<Activities />} />
					<Route path="/time-logger/places" element={<Places />} />
					<Route path="/time-logger/counter" element={<Counter />} />
				</Routes>
				<Nav defaultActiveKey="/time-logger/log-time" as="ul" className="NavBar bg-dark">
					<Nav.Item as="li" className={"NavItem"}>
						<NavLink to="/time-logger/log-time" className={({ isActive }) => isActive ? "text-light text-decoration-underline" : "text-light"}>
							<i className="bi bi-clock-history"></i> Time Log
						</NavLink>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<NavLink to="/time-logger/people" className={({ isActive }) => isActive ? "text-light text-decoration-underline" : "text-light"}>
							<i className="bi bi-people"></i> People
						</NavLink>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<NavLink to="/time-logger/activities" className={({ isActive }) => isActive ? "text-light text-decoration-underline" : "text-light"}>
							<i className="bi bi-list-task"></i> Activities
						</NavLink>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<NavLink to="/time-logger/places" className={({ isActive }) => isActive ? "text-light text-decoration-underline" : "text-light"}>
							<i className="bi bi-geo-alt"></i> Places
						</NavLink>
					</Nav.Item>
				</Nav>
			</header>
		</div>
	);
}

export default App;
