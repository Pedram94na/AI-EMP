export const PopupOverlay = ({ message }) => {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
        <div className="bg-white p-4 rounded shadow text-center" style={{ maxWidth: "400px" }}>
          <p>{message}</p>
        </div>
      </div>
    );
  };
  