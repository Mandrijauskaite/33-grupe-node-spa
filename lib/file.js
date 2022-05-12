import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const file = {};

file.fullPath = (dir, fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../', dir, fileName);
}

file.fullPathPublic = (url) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '../public', url);
}

file.create = async (dir, fileName, content) => {
    const filePath = file.fullPath(dir, fileName);
    let fileDescriptor = null;
    try {
        fileDescriptor = await fs.open(filePath, 'wx');
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return [false, 'OK'];
    } catch (error) {
        return [true, error];
    } finally {
        if (fileDescriptor) {
            await fileDescriptor.close();
        }
    }
}

file.read = async (dir, fileName) => {
    const filePath = file.fullPath(dir, fileName);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return [false, fileContent];
    } catch (error) {
        return [true, error];
    }
}

file.readPublic = async (url) => {
    const filePath = file.fullPathPublic(url);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return [false, fileContent];
    } catch (error) {
        return [true, error];
    }
}

file.readBinaryPublic = async (url) => {
    const filePath = file.fullPathPublic(url);
    try {
        const fileContent = await fs.readFile(filePath);
        return [false, fileContent];
    } catch (error) {
        return [true, error];
    }
}

file.update = async (dir, fileName, content) => {
    const filePath = file.fullPath(dir, fileName);
    let fileDescriptor = null;
    try {
        fileDescriptor = await fs.open(filePath, 'r+');
        await fileDescriptor.truncate();
        await fs.writeFile(fileDescriptor, JSON.stringify(content));
        return [false, 'OK'];
    } catch (error) {
        return [true, error];
    } finally {
        if (fileDescriptor) {
            await fileDescriptor.close();
        }
    }
}

file.delete = async (dir, fileName) => {
    const filePath = file.fullPath(dir, fileName);
    try {
        await fs.unlink(filePath);
        return [false, 'OK'];
    } catch (error) {
        return [true, error];
    }
}

export { file }