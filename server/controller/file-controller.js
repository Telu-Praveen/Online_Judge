const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const { exec } = require("child_process");


const generateFile = async (format, content) => {
    const dirCodes = path.join(__dirname, 'codes');

    if (!fs.existsSync(dirCodes)) {
        fs.mkdirSync(dirCodes, { recursive: true });
    }
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, content);
    return filePath;
};


const generateInputFile = async (input) => {
    const dirInputs = path.join(__dirname, 'inputs');

    if (!fs.existsSync(dirInputs)) {
        fs.mkdirSync(dirInputs, { recursive: true });
    }
    const jobID = uuid();
    const input_filename = `${jobID}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    await fs.writeFileSync(input_filePath, input);
    return input_filePath;
};

const execute = (filepath, inputPath) => {

    const outputPath = path.join(__dirname, "outputs");

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    const jobId = path.basename(filepath).split(".")[0];
    const language = path.basename(filepath).split(".")[1];
    console.log(language)
    const outPath = path.join(outputPath, `${jobId}.out`);

    if (language == "cpp") {
        return new Promise((resolve, reject) => {
            exec(
                `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`,
                (error, stdout, stderr) => {
                    if (error) {
                        reject({ error, stderr });
                    }
                    if (stderr) {
                        reject(stderr);
                    }
                    resolve(stdout);
                }
            );
        });
    }
    else if (language == "java") {
        console.log("java code is compiling")
        const execFile = `${jobId}.java`;
        const output = new Promise((resolve, reject) => {
            exec(`javac ${filepath} && java ${filepath} < ${inputPath}`,
                (error, stdout, stderr) => {
                    if (error) {
                       reject(error);
                    }
                    if (stderr) {
                       reject(stderr);
                    }
                    resolve(stdout);
                });
        });
        return output;
    }
    else if (language == "python") {
        console.log("python code is compiling")
        const execFile = `${jobId}.java`;
        const output = new Promise((resolve, reject) => {
            exec(`python3 ${filepath} ${inputPath}`,
                (error, stdout, stderr) => {
                    if (error) {
                       reject(error);
                    }
                    if (stderr) {
                       reject(stderr);
                    }
                    resolve(stdout);
                });
        });
        return output;
    }

};
module.exports = {
    generateFile, generateInputFile, execute,
};