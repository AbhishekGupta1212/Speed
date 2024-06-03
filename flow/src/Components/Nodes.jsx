import { memo, useCallback } from "react";
import {
  Handle,
  Position,
  getConnectedEdges,
  useNodeId,
  useStore,
} from "reactflow";
import { WhatsApp, MessageRounded } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

const selector = (nodeId) => (s) => {
  const node = s.nodeInternals.get(nodeId);
  const connectedEdges = getConnectedEdges([node], s.edges);
  return connectedEdges.filter((e) => e.source === nodeId).length < 1;
};

const handleStyle = {
  width: 8,
  height: 8,
  background: "darkslategrey",
};

function Nodes({ data, selected }) {
  const nodeId = useNodeId();

  const isConnectable = useStore(useCallback(selector(nodeId)));

  return (
    <>
      <Handle type="target" position={Position.Left} style={handleStyle} />

      <Card
        sx={{
          width: 350,
          height: 105,
          borderRadius: "10px",
          border: selected ? "1px solid steelblue" : "0px",
        }}
        elevation={7}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "rgb(178, 240, 227)", height: 25, width: 25 }}>
              <MessageRounded style={{ color: "black", fontSize: 18 }} />
            </Avatar>
          }
          action={
            <IconButton sx={{ bgcolor: "#ffffff", height: 25, width: 25 }}>
              <WhatsApp style={{ color: "green", fontSize: 15 }} />
            </IconButton>
          }
          title="Send Message"
          titleTypographyProps={{
            color: "darkslategray",
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "sans-serif",
          }}
          sx={{ bgcolor: "rgb(178, 240, 227)", height:12 }}
        />
        <Divider />

        <CardContent sx={{ mt: 0, maxWidth: 450, overflow: "hidden" }}>
          <Typography
            sx={{
              fontFamily: "sans-serif",
              color: "darkslategray",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          >
            {data.label}
          </Typography>
        </CardContent>
      </Card>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={handleStyle}
      />
    </>
  );
}

export default memo(Nodes);