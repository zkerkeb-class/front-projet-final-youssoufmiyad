import React from "react";
import { useParams } from "react-router";

const RecettesDetail = () => {
	const { id } = useParams();
	return <div>
        <h1>Recette detail</h1>
    </div>;
};

export default RecettesDetail;
