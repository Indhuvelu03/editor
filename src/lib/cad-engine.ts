import paper from 'paper';

export const GRID_SIZE = 40;
export const SCALE_MM_TO_PX = 10; // 10px = 1mm

export const snap = (point: paper.Point): paper.Point => {
    return new paper.Point(
        Math.round(point.x / GRID_SIZE) * GRID_SIZE,
        Math.round(point.y / GRID_SIZE) * GRID_SIZE
    );
};

export const getLength = (path: paper.Path): number => {
    return parseFloat((path.length / SCALE_MM_TO_PX).toFixed(2));
};

export const getArea = (path: paper.Path): number => {
    // area is in px^2. 100 px^2 = 1 mm^2. 1,000,000 mm^2 = 1 m^2.
    // path.area is in square units.
    const areaMm2 = Math.abs(path.area) / (SCALE_MM_TO_PX * SCALE_MM_TO_PX);
    const areaM2 = areaMm2 / 1000000;
    return parseFloat(areaM2.toFixed(4));
};

export const getAngle = (p1: paper.Point, p2: paper.Point): number => {
    const delta = p2.subtract(p1);
    return parseFloat(delta.angle.toFixed(2));
};

export const applyShear = (item: paper.Item, amount: number) => {
    const matrix = new paper.Matrix();
    matrix.shear(amount, 0);
    item.transform(matrix);
};

export const rotate90 = (item: paper.Item) => {
    item.rotate(90);
};

export const getLayerColor = (layerName: string, mode: 'dark' | 'light') => {
    if (mode === 'dark') {
        switch (layerName) {
            case 'Walls': return '#fbbf24'; // Amber
            case 'Furniture': return '#3b82f6'; // Blue
            case 'Electrical': return '#22c55e'; // Green
            default: return '#ffffff';
        }
    } else {
        switch (layerName) {
            case 'Walls': return '#d97706'; // Deep Orange
            case 'Furniture': return '#2563eb'; // Deep Blue
            case 'Electrical': return '#16a34a'; // Deep Green
            default: return '#000000';
        }
    }
};
