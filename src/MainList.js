import MainListItem from "./MainListItem";

const MainList = ({listContent}) => {

    return (
        <div className="MainList" >
            {
                listContent && listContent.map(it => <MainListItem key={it.id} item={it}/>)
            }
        </div>);
}

MainList.defaultProps = {
    listContent: []
}

export default MainList;