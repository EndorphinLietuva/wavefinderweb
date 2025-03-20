import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	// Generate pagination items
	const renderPaginationItems = () => {
		const items = [];

		// Always include first page
		items.push(
			<button
				key="first"
				className={`join-item btn btn-sm ${
					currentPage === 1 ? "btn-active" : ""
				}`}
				onClick={() => onPageChange(1)}>
				1
			</button>
		);

		// Add dots after first page if needed
		if (currentPage > 3) {
			items.push(
				<button
					key="dots-1"
					className="join-item btn btn-sm btn-disabled">
					...
				</button>
			);
		}

		// Pages around current page
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			if (i <= 1 || i >= totalPages) continue;

			items.push(
				<button
					key={i}
					className={`join-item btn btn-sm ${
						currentPage === i ? "btn-active" : ""
					}`}
					onClick={() => onPageChange(i)}>
					{i}
				</button>
			);
		}

		// Add dots before last page if needed
		if (currentPage < totalPages - 2) {
			items.push(
				<button
					key="dots-2"
					className="join-item btn btn-sm btn-disabled">
					...
				</button>
			);
		}

		// Always include last page if there's more than one page
		if (totalPages > 1) {
			items.push(
				<button
					key="last"
					className={`join-item btn btn-sm ${
						currentPage === totalPages ? "btn-active" : ""
					}`}
					onClick={() => onPageChange(totalPages)}>
					{totalPages}
				</button>
			);
		}

		return items;
	};

	return (
		<div className="flex justify-center mt-10">
			<div className="join">
				<button
					className="join-item btn btn-sm"
					onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
					disabled={currentPage === 1}>
					«
				</button>

				{renderPaginationItems()}

				<button
					className="join-item btn btn-sm"
					onClick={() =>
						onPageChange(Math.min(currentPage + 1, totalPages))
					}
					disabled={currentPage === totalPages}>
					»
				</button>
			</div>
		</div>
	);
};

export default Pagination;
