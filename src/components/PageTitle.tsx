interface PageTitleProps {
    icon: string;
    title: string;
}

const PageTitle = ({ icon, title }: PageTitleProps) => {
    return (
        <div className="page-title-section">
            <img src={icon} alt="" className="page-title-icon" />
            <span className="page-title-text">{title}</span>
        </div>
    );
};

export default PageTitle;
