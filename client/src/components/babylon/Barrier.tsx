import { Vector3 } from "@babylonjs/core";
import { BallMesh } from "./BallMesh";

interface BarrierProps {
    spin: number;
    winSpin: number;
    pos: [number, number, number];
}

export const Barrier = (props: BarrierProps) => {
    const { spin, pos, winSpin } = props;

    return (
        <sphere
            name="ball-barrier"
            diameter={47}
            segments={16}
            position={new Vector3(0, -29, -3)}
            rotation={new Vector3(19.5, 0, spin + winSpin)}
        >
            <BallMesh pos={pos} />
            <standardMaterial name="barrier" alpha={0} />
        </sphere>
    );
};
