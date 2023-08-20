import { useCallback, useRef, ReactNode } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import close from "../../assets/close.svg"

type EditModalProps = {
    children: ReactNode;
    user: any; // Update the type as per your received data structure
  };
  
  const EditModal = ({ children, user }: EditModalProps) => {
	const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useNavigate();

    const onDismiss = useCallback(() => {        
        router(`/profiles/${user.id}`);
      }, [router, user.id]);
	

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target === overlay.current) && onDismiss) {
            onDismiss();
        }
    }, [onDismiss, overlay]);

	return (
        <div ref={overlay} className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80" onClick={handleClick}>
            <button type="button" onClick={onDismiss} className="absolute top-4 right-8">
                <img src={close} width={17} height={17} alt="close" />
            </button>

            <div ref={wrapper} className="flex justify-start items-center flex-col absolute h-[95%] w-full bottom-0 bg-white rounded-t-3xl lg:px-40 px-8 pt-14 pb-72 overflow-auto">
				{children}
			</div>
		</div>
    )
}

export default EditModal