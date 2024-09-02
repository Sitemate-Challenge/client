import React from "react";

const IssueCard = ({ title, description }) => {
	return (
		<div style={styles.card}>
			<h2 style={styles.title}>{title}</h2>
			<p style={styles.description}>{description}</p>
		</div>
	);
};

const styles = {
	card: {
		border: "1px solid #ddd",
		borderRadius: "8px",
		padding: "16px",
		margin: "16px",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	},
	title: {
		fontSize: "1.5rem",
		margin: "0 0 8px 0",
	},
	description: {
		fontSize: "1rem",
		color: "#555",
	},
};

export default IssueCard;
