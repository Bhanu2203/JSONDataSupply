let Path = require("path");
let CommonFromFilesgetDirectories = require("../../../../UserFolder/getDirectories");
let CommonFromgetDirectories = require("../../ForDuplicate");
let CommonFromgetData = require("../../../../UserFolder/UserJsonFile/PullDataFromFile/FromFolderAndFile");

let StartFunc = async ({ inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};
    LocalReturnObject.Folders = {};

    let LocalArray = CommonFromgetDirectories.AsObject({ inDataPK: LocalDataPK });

    Object.entries(LocalArray).forEach(
        ([KeyFolder, ValueFolder]) => {

            Object.entries(ValueFolder).forEach(
                ([KeyFile, ValueFile]) => {
                    ValueFile.Files = {};
                    let localFilesArray = CommonFromFilesgetDirectories.AsArray({ inFolderName: KeyFile, inDataPK: LocalDataPK });
                    localFilesArray.forEach(loopFileName => {
                        const filename = Path.parse(loopFileName).name
                        ValueFile.Files[filename] = {};
                        ValueFile.Files[filename].FileName = loopFileName;
                        let localData = CommonFromgetData.StartFunc({ inFolderName: KeyFile, inFileNameOnly: filename, inDataPK: LocalDataPK });
                        // console.log("localData",localData);
                        Object.entries(localData.JsonData).forEach(([itemKey, itemValue]) => {
                            ValueFile.Files[filename].Items = {};
                            ValueFile.Files[filename].Items.ItemName = itemKey;

                        });

                    });

                }
            );

        }
    );
    return LocalArray;

};
let LocalMockFunc = async () => {
    let LocalData = await StartFunc({ inDataPK: 1022 });
   // console.log("LocalData : ", LocalData.Folders);
};

// LocalMockFunc();

module.exports = { StartFunc };
