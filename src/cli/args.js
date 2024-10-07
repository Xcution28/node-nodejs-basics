const parseArgs = () => {
    // getting command line arguments
    const args = process.argv.slice(2); // remove the first two elements

    // create an object to store pairs
    const pairs_object = {};

    for (let i = 0; i < args.length; i += 2) {
        const prop_name = args[i].replace('--', ''); // remove prefix '--'
        const value = args[i + 1]; // get next value
        pairs_object[prop_name] = value;
    }

    // forming output
    const output = Object.entries(pairs_object)
        .map(([key, value]) => `${key} is ${value}`)
        .join(', ');

    console.log(output);
};

parseArgs();
