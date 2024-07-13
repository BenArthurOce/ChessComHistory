import styled from 'styled-components';


/* Full-screen container with padding and automatic overflow handling. */
export const Container = styled.div
`
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
`
;

/* Centered content container with a maximum width and border. */
export const Inner = styled.div
`
  height: 100%;
  border: 1px solid #ddd;
  max-width: 800px;
  margin: 0 auto;
`
;

/* Center-aligned heading with bottom padding and border-bottom. */
export const Title = styled.h1
`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`
;

/* Styled button with padding, background color, and hover effect. */
export const Button = styled.button
`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`
;

/* Input field with padding, border, border radius, and focus styling. */
export const Input = styled.input
`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`
;

/* Styled label with font size, color, and bottom margin. */
export const Label = styled.label
`
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
`
;

/* Checkbox input styled with a margin-right for spacing. */
export const Checkbox = styled.input.attrs({ type: 'checkbox' })
`
    margin-right: 5px;
`
;

/* Styled select dropdown with padding, border, and focus styling. */
export const Select = styled.select
`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

/* Textarea input with padding, border, and focus styling. */
export const Textarea = styled.textarea
`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`
;

/* Styled card component with background, shadow, padding, and border radius. */
export const Card = styled.div
`
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
`
;

/* Full-screen overlay with centered content for modal dialogs. */
export const Modal = styled.div
`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`
;

/* Styled navigation bar with background, color, padding, and flex layout. */
export const Navbar = styled.nav
`
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
;

/* Tab component with padding, cursor pointer, and active styling. */
export const Tab = styled.div
`
    padding: 10px 20px;
    cursor: pointer;
    color: ${props => props.active ? '#007bff' : '#333'};
    border-bottom: 2px solid ${props => props.active ? '#007bff' : 'transparent'};
    &:hover {
        color: #007bff;
    }
`
;

/* Inline-block element with hidden tooltip that appears on hover. */
export const Tooltip = styled.span
`
    position: relative;
    display: inline-block;
    &:hover span {
        visibility: visible;
    }
    & span {
        visibility: hidden;
        width: 120px;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
    }
    &:hover span {
        opacity: 1;
    }
`
;

/* Container for collapsible accordion items with border and radius. */
export const Accordion = styled.div
`
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`
;

/* Header for accordion items with background color and hover effect. */
export const AccordionHeader = styled.div
`
    background-color: #f1f1f1;
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #e1e1e1;
    }
`
;

/* Content area of accordion items that expands/collapses. */
export const AccordionContent = styled.div
`
    padding: 10px;
    display: ${props => props.open ? 'block' : 'none'};
`
;

/* Range input styled with track, thumb, and hover opacity effect. */
export const Slider = styled.input.attrs({ type: 'range' })
`
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    height: 5px;
    background: #ddd;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.15s ease-in-out;
    &:hover {
        opacity: 1;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        background: #007bff;
        cursor: pointer;
        border-radius: 50%;
    }
`
;

/* Horizontal progress bar with background and border radius. */
export const ProgressBar = styled.div`
    width: 100%;
    height: 20px;
    background-color: #f1f1f1;
    border-radius: 5px;
    overflow: hidden;
`
;

/* Progress bar filler with dynamic width based on props. */
export const Progress = styled.div`
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #007bff;
`
;

/* Styled table with full width, border-collapse, and margin. */
export const Table = styled.table
`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`
;

/* */
export const Th = styled.th
`
    background-color: #f1f1f1;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`
;

/* */
export const Td = styled.td
`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`
;

/* Custom toggle switch with slider animation and label. */
export const ToggleSwitch = styled.label
`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
`
;

/* Slider part of the toggle switch with background and radius. */
export const ToggleSlider = styled.span
`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 20px;
    transition: .4s;
    &:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 12px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        border-radius: 50%;
        transition: .4s;
    }
`
;


/* Hidden input for the toggle switch functionality. */
export const ToggleInput = styled.input.attrs({ type: 'checkbox' })
`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + ${ToggleSlider} {
        background-color: #007bff;
    }
    &:checked + ${ToggleSlider}:before {
        transform: translateX(20px);
    }
`
;

/* Inline-block element for displaying colored badges with text. */
export const Badge = styled.span
`
    display: inline-block;
    padding: 5px 10px;
    background-color: ${props => props.color ? props.color : '#007bff'};
    color: white;
    font-size: 12px;
    border-radius: 10px;
`;


/* Circular image avatar with customizable size and border radius. */
export const Avatar = styled.img
`
    width: ${props => props.size ? props.size : '40px'};
    height: ${props => props.size ? props.size : '40px'};
    border-radius: 50%;
`
;

/* Styled notification box with background, padding, and border radius. */
export const Notification = styled.div
`
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    margin-bottom: 10px;
`
;

/* Label for radio input with border, background color, and text color. */
export const RadioLabel = styled.label
`
    display: inline-block;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    background-color: ${props => props.checked ? '#007bff' : '#fff'};
    color: ${props => props.checked ? '#fff' : '#333'};
`
;

/* Hidden radio input for controlled radio button behavior. */
export const RadioInput = styled.input.attrs({ type: 'radio' })
`
    display: none;
    &:checked + ${RadioLabel} {
        background-color: #007bff;
        color: #fff;
    }
`
;

/* Navigation component with flexible items and divider. */
export const Breadcrumb = styled.nav
`
    display: flex;
    align-items: center;
    font-size: 14px;
`
;

/* Individual item in breadcrumb navigation with active and hover styles. */
export const BreadcrumbItem = styled.span
`
    cursor: pointer;
    color: ${props => props.active ? '#333' : '#007bff'};
    &:not(:last-child)::after {
        content: '/';
        margin: 0 10px;
        color: #ccc;
    }
`
;

/* Styled search input with padding, border, and placeholder. */
export const SearchInput = styled.input
`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 200px;
    &::placeholder {
        color: #ccc;
    }
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`
;

/* List for pagination links with centered items and hover effect. */
export const Pagination = styled.ul
`
    list-style-type: none;
    display: flex;
    justify-content: center;
    padding: 0;
`
;

/* Individual pagination item with padding, border, and active state. */
export const PaginationItem = styled.li
`
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: ${props => props.active ? '#007bff' : '#333'};
    &:hover {
        background-color: #f1f1f1;
    }
`
;

/* Styled alert box with padding, margin, background color, and border. */
export const Alert = styled.div
`
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
`
;


export const DropDownBox = styled.div
`
    position: relative;
    display: inline-block;
`
;

/* Container for dropdown content with relative positioning. */
// export const DropdownMenu = styled.div
// `
//     position: relative;
//     display: inline-block;
// `
// ;

/* Button that triggers dropdown menu with background and hover effect. */
// export const DropdownButton = styled.button
// `
//     background-color: #007bff;
//     color: white;
//     padding: 10px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     &:hover {
//         background-color: #0056b3;
//     }
// `
// ;

/* Content of dropdown menu with absolute positioning and shadow. */
// export const DropdownContent = styled.div
// `
//     display: ${props => props.open ? 'block' : 'none'};
//     position: absolute;
//     background-color: #f9f9f9;
//     min-width: 160px;
//     box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
//     z-index: 1;
// `;

/* Individual item in dropdown menu with padding and hover effect. */
// export const DropdownItem = styled.div
// `
//     padding: 10px;
//     cursor: pointer;
//     &:hover {
//         background-color: #f1f1f1;
//     }
// `
// ;


/* Full-screen modal dialog with fixed positioning and overlay. */
export const ModalDialog = styled.div
`
    display: ${props => props.open ? 'block' : 'none'};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    overflow: auto;
    padding-top: 60px;
`
;

/* Content area of the modal dialog with padding, border, and shadow. */
export const ModalContent = styled.div
`
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    position: relative;
`
;

/* Close button for modal dialog with hover effect and cursor pointer. */
export const ModalClose = styled.span
`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: black;
    }
`
;

/* Input field for date selection with padding, border, and focus styling. */
export const DatePicker = styled.input.attrs({ type: 'date' })
`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`
;

/* Styled input field for file uploads with padding and focus styling. */
export const FileInput = styled.input.attrs({ type: 'file' })
`
    padding: 10px;
    &:focus {
        outline: none;
    }
`
;
