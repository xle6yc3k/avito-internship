
export const CATEGORIES = {
    ELECTRONICS: 0,
    REAL_ESTATE: 1,
    TRANSPORT: 2,
    JOBS: 3,
    SERVICES: 4,
    ANIMALS: 5,
    FASHION: 6,
    KIDS: 7,
};
  
export const CATEGORY_LABELS = {
    [CATEGORIES.ELECTRONICS]: 'Электроника',
    [CATEGORIES.REAL_ESTATE]: 'Недвижимость',
    [CATEGORIES.TRANSPORT]: 'Транспорт',
    [CATEGORIES.JOBS]: 'Работа',
    [CATEGORIES.SERVICES]: 'Услуги',
    [CATEGORIES.ANIMALS]: 'Животные',
    [CATEGORIES.FASHION]: 'Мода',
    [CATEGORIES.KIDS]: 'Детское',
};
  
export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
}));
  
export const STATUSES = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DRAFT: 'draft',
};
  
export const STATUS_LABELS = {
    [STATUSES.PENDING]: 'На модерации',
    [STATUSES.APPROVED]: 'Одобрено',
    [STATUSES.REJECTED]: 'Отклонено',
    [STATUSES.DRAFT]: 'Черновик',
};
  
export const STATUS_VARIANTS = {
    [STATUSES.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [STATUSES.APPROVED]: 'bg-green-100 text-green-800 border-green-200',
    [STATUSES.REJECTED]: 'bg-red-100 text-red-800 border-red-200',
    [STATUSES.DRAFT]: 'bg-gray-100 text-gray-800 border-gray-200',
};
  
export const PRIORITIES = {
    NORMAL: 'normal',
    URGENT: 'urgent',
};
  
export const PRIORITY_LABELS = {
    [PRIORITIES.NORMAL]: 'Обычное',
    [PRIORITIES.URGENT]: 'Срочно',
};

export const REJECTION_REASONS = [
    'Запрещенный товар',
    'Неверная категория',
    'Некорректное описание',
    'Проблемы с фото',
    'Подозрение на мошенничество',
    'Другое'
];