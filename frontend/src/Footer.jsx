export const Footer = ({ apiBase, loading, error }) => {
    return (<>
        <div className="status">
            API target: http://localhost{apiBase}
            {loading && ' · Loading products...'}
            {error && ` · Error: ${error}`}
        </div>
    </>);
}