import MainListItem from "./MainListItem";

const MainList = ({listContent}) => {

    return (<div className="MainList">
        <h2>MainList</h2>
        {
            listContent && listContent.map(it => <MainListItem key={it.id} item={it}/>)
        }
    </div>);
}

MainList.defaultProps = {
    listContent: []
}

export default MainList;