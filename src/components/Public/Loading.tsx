import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
    return (
        <div className="flex justify-center items-center h-full w-full bg-white dark:bg-slate-950">
            <CircularProgress size="3rem" />
        </div>
    );
}

export default Loading;