import { PrismaClient } from '@prisma/client'
//import { model } from 'mongoose';

class PrismaBaseClass{
    static subclasses = {};
    static registerSubclass(name, subclass) {
        PrismaBaseClass.subclasses[name] = subclass;
      };
      constructor() {
        if (this.constructor === PrismaBaseClass) { throw new Error("Cannot instantiate Abstract Classes") }; //Abstract class
      }
    static register(){
        throw new Error("Add static register(){super.registerSubclass(this.toString(), this)} to the class definition of " + this.toString())
    }
}



function modifyQuery({modelname, prismaOperation, args, query}){
    // for default scoping. Other scopes can be added

    const model = PrismaBaseClass.subclasses[modelname]; // Get the class itself, not just a string of the name
    
    let operation = prismaOperation;
    const substringsToRemove = [/andreturn/gi, /orthrow/gi]; 
    substringsToRemove.forEach((substring) => operation = operation.replace(substring, ''));
    // These differ only at the return-step, not the query itself so the scopes should be the same

    // Must get keys from hash table, allowing naming as either DefaultScope or DefaultTake
    ['DefaultScope', 'DefaultTake'].forEach((querytype) =>{    
        if (typeof model[operation + querytype] === 'HashTable') {
            const scopes = model[operation + querytype];
            scopes.forEach((column, conditions) => {
                if (!Object.keys(args.where).includes(column)) args.where[column] = {}
                scopes[column].forEach((condition, value) => {
                    if (typeof(args.where[column][condition]) != 'HashTable'){
                        args.where[column][condition] = value;
                        // Override default scopes by specifying alternate conditions for in the query
                    }
                })
            }
                
        )}
    });
    return query(args)
}

export const ActiveClient = new PrismaClient().$extends({
    query: {
        $allModels: {
            $allOperations({ modelname, operation, args, query }){
                model = eval(modelname); // Get the class itself, not just a string of the name
                if(typeof model['before_' + operation] === 'function') model['before_' + operation](args);
                if (operation == 'createManyAndReturn' && typeof model['before_createMany'] === 'function') model.before_createMany(args);
                if ((operation == 'create' || operation == 'update') && typeof model['before_upsert'] === 'function') model.before_upsert(args);

                results = null; // Ensuring that results-variable exists in appropriate scope, can be removed if unnecessary
                if (typeof model['around_' + operation] === 'function'){
                    results = model['around_' + operation](query, args) // general case
                } else if(operation == 'createManyAndReturn ' && typeof model['around_createMany'] === 'function') {
                    results = model.around_createMany(query, args); // special case
                } else if((operation == 'create' || operation == 'update') && typeof model['before_upsert'] === 'function') {
                    results = model.around_upsert(query, args); // special case
                } else {
                    results = query(args); // default behaviour
                }
                // TODO: Make Create, Update, and Delete call the Many versions - must see how to edit Args to get the right 1-element Array
                if (operation == 'createManyAndReturn' && typeof model['before_createMany'] === 'function') model.around_createMany(args);
                if ((operation == 'create' || operation == 'update') && typeof model['after_upsert'] === 'function') model.after_upsert(args);
                if (typeof model['after_' + operation] === 'function') model['after_' + operation](args);
                return results;
            }
        }
    }
}).$extends({
    query: {
        $allModels: {
            async findMany({ modelname, operation, args, query }){ modifyQuery({modelname, operation, args, query}) },
            async findUniqueOrThrow({ modelname, operation, args, query }){ modifyQuery({modelname, operation, args, query}) },
            async FindUnique ({ modelname, operation, args, query }){ modifyQuery({modelname, operation, args, query}) },
            async findUniqueOrThrow ({ modelname, operation, args, query }){ modifyQuery({modelname, operation, args, query}) },
            async findFirst ({ modelname, operation, args, query }){ modifyQuery({modelname, operation, args, query}) },
            async findFirstOrThrow ({ modelname, operation, args, query }){ modifyQuery({modelname, operation, args, query}) }
        }
    }
});