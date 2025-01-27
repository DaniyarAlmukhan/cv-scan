import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import './popover.style.scss';
import { clsx } from 'clsx';

type IPopoverPosition =
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'left-bottom'
  | 'right-bottom'
  | 'bottom-right';

const margin = 5;

interface IProps {
  children: React.ReactNode;
  content: React.ReactNode;
  setIsActive?: (value: boolean) => void;
  position?: IPopoverPosition;
  closeOnClick?: boolean;
  onOpen?: () => void;
  preloadContent?: boolean;
  disableOutsideClick?: boolean;
  relativeToParent?: boolean;
  tooltip?: { text: string; position?: string };
}

const Popover = forwardRef(function Popover(
  {
    children,
    content,
    setIsActive,
    position = 'bottom',
    closeOnClick = true,
    onOpen,
    preloadContent = false,
    disableOutsideClick = false,
    relativeToParent = false,
    tooltip,
  }: IProps,
  ref,
) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [popoverPosition, setPopoverPosition] = useState<IPopoverPosition>(position);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const callBackRef = useCallback(
    (domNode: HTMLDivElement) => {
      if (domNode && content && isOpen) {
        setTimeout(() => {
          const dimensions = domNode.getBoundingClientRect();
          const wrapper = wrapperRef.current?.getBoundingClientRect();
          if (dimensions && wrapper && Object.values(wrapper).some((val: DOMRect) => +val !== 0)) {
            const { width } = dimensions;
            if (['right', 'right-bottom'].includes(position)) {
              if (wrapper.right + margin + width > window.innerWidth) {
                const newPosition = position === 'right' ? 'left' : 'left-bottom';
                setPopoverPosition(newPosition);
              }
              return;
            }
            if (['left', 'left-bottom'].includes(position)) {
              if (wrapper.left - margin - width < 0) {
                const newPosition = position === 'left' ? 'right' : 'right-bottom';
                setPopoverPosition(newPosition);
              }
              return;
            }

            setPopoverPosition(position);
          }
        }, 10);
      }
    },
    [content, isOpen, wrapperRef],
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        // close() {
        //   setIsOpen(false);
        // },
      };
    },
    [],
  );

  const modalOverlayCheck = (element: HTMLElement | null, id: string): boolean => {
    if (!element) return false;

    if (element.id === id) return true;

    if (element.tagName.toLowerCase() === 'button' && element.id !== 'modal-close') return false;

    return modalOverlayCheck(element.parentElement, id);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isNotification =
        (event.target as HTMLElement)?.parentElement?.id === 'notification' ||
        (event.target as HTMLElement)?.id === 'notification';

      const isModalOverlay = modalOverlayCheck(event.target as HTMLElement, 'modal-overlay');

      if (
        !disableOutsideClick &&
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        !isNotification &&
        !isModalOverlay
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [disableOutsideClick, isOpen, wrapperRef]);

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsActive && setIsActive(isOpen);
      if (isOpen && onOpen) {
        onOpen();
      }
    }
  }, [isOpen]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (closeOnClick) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={clsx({
        popover__wrapper: true,
        ['popover__wrapper--relativeToParent']: isOpen && relativeToParent,
      })}
      ref={wrapperRef}
    >
      <div
        onClick={(event) => {
          setIsOpen(!isOpen);
          event.stopPropagation();
        }}
        data-tooltip={!isOpen ? tooltip?.text : null}
        data-tooltip-position={tooltip?.position}
      >
        {children}
      </div>
      {content && (preloadContent || (!preloadContent && isOpen)) && (
        <div
          ref={callBackRef}
          className={clsx({
            popover__content: true,
            [`popover__content--${popoverPosition}`]: true,
            ['popover__content--isOpen']: isOpen,
          })}
          onClick={handleClick}
        >
          {content}
        </div>
      )}
    </div>
  );
});

export default Popover;
