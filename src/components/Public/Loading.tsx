import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <CircularProgress size="3rem" />
        </div>
    );
}

export default Loading;