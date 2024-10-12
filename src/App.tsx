import React from "react";
import logo from "./logo.svg";
import { Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
import { LogTime, People, Activities, Places } from "./pages";
import { ViewLog } from "./pages/view-log";
import { Nav, Button } from "react-bootstrap";


function App() {

	const [page,setPage] = React.useState("log-time");

	return (
		<div className="App">
			<header className="App-header">
				{page === "log-time" && <ViewLog />}
				{page === "people" && <People />}
				{page === "activities" && <Activities />}
				{page === "places" && <Places />}
				<Nav defaultActiveKey="/time-logger/log-time" as="ul" className="NavBar bg-dark">
					<Nav.Item as="li" className={"NavItem"}>
						<Button onClick={() => setPage("log-time")} variant="outline" className={page === "log-time" ? "active NavButton" : "NavButton"}>
							<i className="bi bi-clock-history"></i>
						</Button>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<Button onClick={() => setPage("people")}  variant="outline" className={page === "people" ? "active NavButton" : "NavButton"}>
							<i className="bi bi-people"></i>
						</Button>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<Button onClick={() => setPage("activities")}  variant="outline" className={page === "activities" ? "active NavButton" : "NavButton"}>
							<i className="bi bi-list-task"></i>
						</Button>
					</Nav.Item>
					<Nav.Item as="li" className="NavItem">
						<Button onClick={() => setPage("places")}  variant="outline" className={page === "places" ? "active NavButton" : "NavButton" }>
							<i className="bi bi-geo-alt"></i>
						</Button>
					</Nav.Item>
				</Nav>
			</header>
		</div>
	);
}

export default App;
