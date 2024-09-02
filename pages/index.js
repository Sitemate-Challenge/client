import React, { useEffect, useState } from "react";

import IssueCard from "../component/IssueCard";

import styles from "../styles/Home.module.css";

export default function Home() {
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchIssues = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/v1/issues");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setIssues(data?.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchIssues();
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Issue List</h1>
			{error ? (
				<div className={styles.errorContainer}>
					<p className={styles.errorMessage}>Error: {error}</p>
				</div>
			) : (
				<div className={styles.issueContainer}>
					{issues.map((issue) => (
						<IssueCard
							key={issue.ID} // Assuming each issue has a unique id
							title={issue.Title}
							description={issue.Description}
						/>
					))}
				</div>
			)}
		</div>
	);
}
