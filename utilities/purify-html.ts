import DOMPurify from 'dompurify';

export default (dynamicHTML: string) => DOMPurify.sanitize(dynamicHTML);
