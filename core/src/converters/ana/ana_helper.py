import re
import json
from src.logger import logger
from src.utils import Util
import copy

class AnaHelper():

    @staticmethod
    def is_condition_match(left_operand, operator, right_operand):

        match = 0

        if operator != "IsNull":
            if left_operand is None or right_operand is None:
                return match

        if isinstance(left_operand, bool):

            left_operand = "true" if left_operand else "false"

        elif isinstance(left_operand, float):

            try:
                left_operand = float(left_operand)
                right_operand = float(right_operand)
            except ValueError:
                left_operand = str(left_operand)
                right_operand = str(right_operand)

        elif isinstance(left_operand, int):

            left_operand = int(left_operand)
            right_operand = int(right_operand)

        if operator == "EqualTo":
            match = left_operand == right_operand

        elif operator == "NotEqualTo":
            match = left_operand != right_operand

        elif operator == "GreaterThan":
            match = left_operand > right_operand

        elif operator == "LessThan":
            match = left_operand < right_operand

        elif operator == "GreaterThanOrEqualTo":
            match = left_operand >= right_operand

        elif operator == "LessThanOrEqualTo":
            match = left_operand <= right_operand

        elif operator == "Mod":
            match = left_operand % right_operand

        elif operator == "In":
            values = right_operand.split(",")
            match = left_operand in values

        elif operator == "NotIn":
            values = right_operand.split(",")
            match = left_operand not in values

        elif operator == "StartsWith":
            match = left_operand.startswith(right_operand)

        elif operator == "EndsWith":
            match = left_operand.endswith(right_operand)

        elif operator == "Contains":
            match = right_operand in left_operand

        elif operator == "IsNull":
            match = bool(left_operand) is False

        elif operator == "Between":
            values = right_operand.split(",")[:2]
            match = left_operand > values[0] and left_operand < values[1]
        else:
            logger.error(f"Unknown operator found {operator}")

        return match

    @staticmethod
    def verb_replacer(text, state):
        if text is None:
            return text
        variable_data = state.get("var_data", {})

        logger.debug(f"variable_data {variable_data} {variable_data.__class__}")
        logger.debug(f"text received for replacing verbs is {text}")

        # if isinstance(variable_data, str):
            # variable_data = json.loads(variable_data)

        all_matches = re.findall(r"\[~(.*?)\]|{{(.*?)}}", text)

        for matches in all_matches:
            for match in matches:
                logger.debug(f"match: {match}")
                if variable_data.get(match, None) is not None:
                    logger.debug(f"Match exists in variable_data {variable_data[match]}")
                    variable_value = variable_data[match]
                    variable_value = str(AnaHelper.escape_json_text(variable_value))
                    text = text.replace("[~" + match + "]", variable_value).replace("{{" + match + "}}", variable_value)
                    logger.debug(f"Text just after replacing is {text}")
                else:
                    logger.debug("No exact match")
                    root_key = re.split(r"\.|\[", match)[0]
                    logger.debug(f"match: {match}")
                    logger.debug(f"root_key: {root_key}")
                    if variable_data.get(root_key, None) is None:
                        continue
                    variable_value = Util.deep_find({root_key:variable_data[root_key]}, match)
                    variable_value = str(AnaHelper.escape_json_text(variable_value))
                    logger.debug(f"match: {match}")
                    logger.debug(f"variable_value: {variable_value}")
                    text = text.replace("[~" + match + "]", str(variable_value)).replace("{{" + match + "}}", str(variable_value))
        logger.debug(f"Text after replacing verbs is {text}")
        return text

    @staticmethod
    def __process_repeatable_item(ana_repeatable, state, is_carousel):
        variable_data = state.get("var_data", {})

        repeat_on_varname = ana_repeatable.get("RepeatOn", None)
        repeat_on = variable_data.get(repeat_on_varname, None)

        if repeat_on is None:
            logger.debug(f"No exact repeat_on_varname")
            root_key = re.split(r"\.|\[", repeat_on_varname)[0]
            if variable_data.get(root_key, None) is not None:
                repeat_on = Util.deep_find({root_key:variable_data[root_key]}, repeat_on_varname)
        
        logger.info("repeat_on: " + json.dumps(repeat_on))
        
        repeat_as_varname = ana_repeatable.get("RepeatAs", None)
        start_position = ana_repeatable.get("StartPosition", 0)
        max_repeats = ana_repeatable.get("MaxRepeats", None)
        end_position = None
        if max_repeats:
            end_position = start_position + max_repeats
            pass
        resulting_items = []
        if isinstance(repeat_on, list):
            for item in repeat_on[start_position:end_position]:
                tempState = {}
                tempState['var_data'] = copy.deepcopy(variable_data)
                tempState['var_data'][repeat_as_varname] = item
                item_json = json.dumps(ana_repeatable)
                replaced_item_json = AnaHelper.verb_replacer(text=item_json, state=tempState)
                replaced_item = json.loads(replaced_item_json)
                if is_carousel:
                    car_buttons = replaced_item.get("Buttons", [])
                    car_buttons = AnaHelper.process_repeatable(car_buttons, tempState, False)
                    for car_button in car_buttons:
                        car_button["DoesRepeat"] = False
                    replaced_item["Buttons"] = car_buttons
                    pass
                replaced_item['_id'] = replaced_item.get('_id', '') + "--" + str(repeat_on.index(item))
                resulting_items.append(replaced_item)
                pass
            pass
        pass
        return resulting_items

    @staticmethod
    def process_repeatable(ana_repeatable_items, state, is_carousel=False):
        items_after_repeatation = []
        for ana_repeatable in ana_repeatable_items:
            if ana_repeatable.get("DoesRepeat", None):
                logger.info(f"Inside process_repeatable does repeat")
                processed_item_list = AnaHelper.__process_repeatable_item(ana_repeatable, state, is_carousel)
                items_after_repeatation.extend(processed_item_list)
            else:
                items_after_repeatation.append(ana_repeatable)
                pass
            pass
        if is_carousel:
            for item in items_after_repeatation:
                btns = item.get("Buttons", [])
                for btn in btns:
                    btn['_id'] = btn.get('_id', '') + "--" + str(items_after_repeatation.index(item))
                    pass
                pass
            pass
        return items_after_repeatation

    @staticmethod
    def escape_json_text(text):
        if isinstance(text, str):
            text = text.replace("\n", "\\n").replace("\t", "\\t").replace("\r", "\\r")
        return text
