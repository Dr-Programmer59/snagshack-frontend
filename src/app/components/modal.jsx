import { useEffect, cloneElement } from "react";

const Modal = ({ onClose, children }) => {

    useEffect(() => {
        console.log('Modal component rendered!');
        // Disable scrolling while the modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center w-full h-full overflow-auto">
            {/* Clone the children and pass the onClose prop */}
            {cloneElement(children, { onClose })}
        </div>
    );
};

export default Modal;
