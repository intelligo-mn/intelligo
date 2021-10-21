from src.converters.agent.agent_converter import Converter as AgentConverter

class AgentHandOffProcessor():

    def __init__(self, state):
        self.state = state

    def get_next_node(self, node_data):

        # return the same node_data since it's handoffagent node, it is
        # the final node to process
        next_node_key = self.state.get("flow_id", "") + "." + node_data.get("Id")
        return {"id" : next_node_key, "data": node_data}

    @classmethod
    def process_node(cls, message_data, *args):
        agent_messages = [message_data]
        user_messages = AgentConverter.get_agent_connected_messages()
        return {"user_messages": user_messages,
                "agent_messages": agent_messages}
