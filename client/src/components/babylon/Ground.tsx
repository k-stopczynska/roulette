import { TextureAssetTask, Vector3 } from "@babylonjs/core";
import { Task, TaskType, useAssetManager } from "react-babylonjs";
import "@babylonjs/core/Loading/loadingScreen";
import { assetsURL } from "../../utils/utils";

export const Ground = () => {
    const textureAssets: Task[] = [
        {
            taskType: TaskType.Texture,
            url: assetsURL.grass,
            name: "table",
        },
    ];
    const assetManagerResult = useAssetManager(textureAssets, {
        useDefaultLoadingScreen: true,
    });
    return (
        <ground
            name="ground"
            width={200}
            height={200}
            position={new Vector3(0, -36, 0)}
            rotation={new Vector3(-19.5, 0, 0)}
            receiveShadows
        >
            <standardMaterial name="table">
                <texture
                    url={assetsURL.grass}
                    fromInstance={
                        (
                            assetManagerResult.taskNameMap[
                                "table"
                            ] as TextureAssetTask
                        ).texture
                    }
                    assignTo="diffuseTexture"
                    uScale={40}
                    vScale={40}
                ></texture>
            </standardMaterial>
        </ground>
    );
};
