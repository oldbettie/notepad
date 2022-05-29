import React from "react";

function Button({ content, classnames, onClick }) {
	return (
		<button className={classnames} onClick={onClick}>
			<p>{content}</p>
		</button>
	);
}

export default Button;
