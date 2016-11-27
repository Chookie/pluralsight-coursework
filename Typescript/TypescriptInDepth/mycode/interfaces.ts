'use strict';

import { category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: category;
    pages?: number
    markDamaged?: (reason: string) => void;
}

export { Book };